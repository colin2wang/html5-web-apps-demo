<template>

  <div>
    <h1>
      精灵图生成器 <small><a href="/">返回游戏</a></small>
    </h1>
    <h2>预览精灵图</h2>
    <el-row class="tools" >
      <el-button>
        <input type="file" multiple='multiple' accept=".png" v-on:change="reviewImg" />
      </el-button>
      <el-input class="col" v-model="reviewSprite" placeholder="精灵图配置"></el-input>
      <el-select class="col" v-model="reviewKey" placeholder="选择想要预览的key">
          <el-option
            v-for="item in reivewOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
      </el-select>
      
      <el-input-number 
        v-model="reviewSpeed" 
        :step="0.05" 
        :min="0.05" 
        :max="10" 
        label="速度"
      ></el-input-number>

      <el-button type="primary" v-on:click="review">
        开始
      </el-button>
    </el-row>
    <h2>生成精灵图</h2>
    <el-row class="tools" >
      <el-button>
        <input type="file" multiple='multiple' accept=".png" v-on:change="choiceImg" />
      </el-button>
      <el-button type="primary" v-on:click="saveSprite" >保存图片</el-button>
    </el-row>
  <!-- 
    预览精灵图
    1. 图片
    2. 开始和结束的位置
    3. 速度
  -->
    <canvas
      class="game"
      ref="canvas"
      width="1000"
      height="200"
    ></canvas>
    <div>
      <textarea cols="140" readonly rows="20" v-model="imgsConfStr" ></textarea>
    </div>
  </div>

</template>
<script>

import { fileToImage, dataUrlToBlob } from '../util/index'
import RoleAction from '../Enum/roleAction';

export default {
  name: 'SpriteGenerator',
  data: () => ({
    width: 1000,
    height: 200,
    imgMap: {},
    imgsConf: {
      /*
        期望的数据结构
        key: [ [ {name: '', x: y: } ], [ {name: '', x: y: } ] ] // 一套动作
      */
    },

    reviewKey: '',
    reviewSprite: '',
    reviewIndex: 0,
    reviewSpeed: 0.2,
    reviewImage: new Image(),
    anim: null,
  }),
  mounted () {
    this.ctx = this.$refs.canvas.getContext('2d');
  },
  methods: {
    reviewDraw(img) {
      this.ctx.drawImage(
        img, 0, 0
      )
    },
    reviewImg(e) {
      (async () => {
        let img = await fileToImage(e.target.files[0])
        this.reviewDraw(img)
        this.reviewImage = img
      })();
    },
    animationFrame(imgList) {
      if (this.reviewIndex > imgList.length - 1) {
        this.reviewIndex = 0;
      }
      let img = imgList[Math.floor(this.reviewIndex)];
      this.ctx.clearRect(0,0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.ctx.drawImage(
        this.reviewImage,
        img.x, img.y, img.W, img.H,
        20, 20,
        img.W, img.H,
      );
      this.reviewIndex += this.reviewSpeed;
      this.anim = requestAnimationFrame(() => this.animationFrame(imgList));
    },
    review() {
      console.log('reviewSprite')
      try {
        if (this.reviewSprite) {
          let map = JSON.parse(this.reviewSprite)
          cancelAnimationFrame(this.anim);
          this.reviewIndex = 0;
          this.animationFrame(map[this.reviewKey])
        }
      } catch (error) {
        console.log(error)
      }
    },
    saveSprite() {
      const { width, height } = this.$refs.canvas;
      const link = document.createElement("a");
      const imgData = this.$refs.canvas.toDataURL({format: 'png', quality:1, width, height});
      const blob = dataUrlToBlob(imgData);
      const objurl = URL.createObjectURL(blob);
      link.download = "access.png";
      link.href = objurl;
      link.click();
    },
    choiceImg (e) {
      (async () => {
        for (let img of e.target.files) {
          for (let key of RoleAction) {
            if (img.name.indexOf(key) !== -1) {
              let imgObj = {
                  name: img.name,
                  data: await fileToImage(img)
              }
              if (this.imgMap[key]) {
                this.imgMap[key].push(imgObj)
              } else {
                this.imgMap[key] = [imgObj]
              }
            }
          }
        }
        this.draw();
      })();
    },
    // 根据最大宽度组织图片组矩阵, 充分利用空间
    formatImgs(maxWidth) {
      let imgMatrix = [[]];
      let maxHeight = 0;
      let currentX = 0;
      let beforeImg = null;
      for (let key in this.imgMap) {
        let imgList = this.imgMap[key];
        for (let i = 0; i < imgList.length; i++) {
          let img = imgList[i];
          if (beforeImg) {
            currentX += beforeImg.data.width;
          }
          img.key = key;
          if ((currentX + img.data.width) > maxWidth) {
            // 需要另起一行
            currentX = 0;
            img.x = 0;
            imgMatrix.push([img]);
          } else {
            // 不足一行
            img.x = currentX;
            imgMatrix[imgMatrix.length - 1].push(img);
          }
          beforeImg = img;
        }
      }
      for (let imgRow of imgMatrix) {
        if (imgRow.length) {
          maxHeight += Math.max(...imgRow.map(img => img.data.height));
        }
      }
      return {
        imgMatrix, maxHeight
      }
    },
    draw() {
      // 得出画布总高度和总宽度
      let maxWidht = 0;          // 最大宽度
      for (let key in this.imgMap) {
        const imgRow = this.imgMap[key];
        let countWidth = imgRow.reduce((res, img) => {
          res+= img.data.width;
          return res;
        }, 0)
        maxWidht = maxWidht < countWidth ? countWidth : maxWidht;
      }
      this.$refs.canvas.width = maxWidht;
      const { imgMatrix, maxHeight } = this.formatImgs(maxWidht);
      this.$refs.canvas.height = maxHeight;
      let y = 0;
      let imgsConf = {};
      for (let imgRow of imgMatrix) {
        let rowMaxHeight = Math.max(...imgRow.map(img => img.data.height));
        for (let img of imgRow) {
          let currentY = y + rowMaxHeight - img.data.height;
          this.ctx.drawImage(img.data, img.x, currentY);
          imgsConf[img.key] = imgsConf[img.key] || [];
          imgsConf[img.key].push({ 
            name: img.name,
            x: img.x,
            y: currentY, // 统一角色的 Y  轴
            W: img.data.width,
            H: img.data.height,
          });
        }
        y += rowMaxHeight;
      }
      this.imgsConf = imgsConf;
    }
  },
  computed: {
    imgsConfStr() {
      return JSON.stringify(this.imgsConf, null, 2);
    },
    reivewOptions() {
      let options = []
      try {
        if (this.reviewSprite) {
          let map = JSON.parse(this.reviewSprite)
          for (let key in map) {
            options.push({ value: key })
          }
        }
      } catch (error) {
        console.log(error)
      }
      return options
    }
  }
}
</script>
<style scoped>
.game{
  border: 1px solid #333;
}
.tools{
  padding: 10px 0;
}
.col{
  width: auto;
  padding: 10px;
}
</style>