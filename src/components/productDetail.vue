<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length" :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}123123</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">

                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <el-input-number v-model="buyCount" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button v-on:click="cartAdd" class="buy">立即购买</button>
                                                <button v-on:click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=false" :class="{selected: !showDiscuss}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=true" :class="{selected: showDiscuss}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" style="display: block;" v-html="goodsinfo.content" v-show="showDiscuss==false">

                            </div>
                            <div class="tab-content" style="display: block;" v-show="showDiscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commenttxt" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="message.length <= 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.replay_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div> -->
                                        <Page :total="totalCount" show-sizer placement="top"y show-elevator @on-change="pageChange" @on-page-size-change="pageSizeChange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <router-link :to="'/detail/' + item.id">
                                            <div class="img-box">
                                                <a href="#/site/goodsinfo/90" class="">
                                                    <img :src="item.img_url">
                                                </a>
                                            </div>
                                            <div class="txt-box">
                                                <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                                <span>{{item.add_time | filterDate }}</span>
                                            </div>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回到顶部 -->
        <BackTop></BackTop>
    </div>

</template>
<script>
;
export default {
  name: "detail",
  data: function() {
    return {
      productId: 89,
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyCount: 0,
      //商品介绍和商品评论的类名控制
      showDiscuss: true,
      //评论页码
      pageIndex: 1,
      //评论页码容量
      pageSize: 10,
      //评论总条数
      totalCount: 0,
      //评论内容
      message: [],
      //评论内容
      commenttxt: "",
      //放大镜相关数据
      images: {
        thumbs: [],
        normal_size: [],
        large_size: []
      },
      //放大镜相关数据
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container",
        hoverDelay: 300,
        namespace: "container-zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#ff3d00"
      }
    };
  },
  methods: {
    handleChange() {},
    postComment() {
      if (this.commenttxt == "") {
        this.$Message.warning("评论内容不能为空");
        return;
      }
      this.$axios
        .post(
          `/site/validate/comment/post/goods/${
            this.productId
          }`,
          {
            commenttxt: this.commenttxt
          }
        )
        .then(response => {
          // console.log(response);
          if (response.data.status == 0) {
            //评论成功
            this.$Message.success("评论成功!");
            this.getCommentInfo();
          }

          this.commenttxt = "";
        });
    },
    getProductInfo() {
      //获得主体商品列表数据
      this.$axios
        .get(
          `/site/goods/getgoodsinfo/${this.productId}`
        )
        .then(response => {
          //   console.log(response);

          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          //处理放大镜数据
          let temArr = [];
          //循环处理数据
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          //临时数组
          this.images.thumbs = temArr;

          //循环处理数据
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          //临时数组
          this.images.normal_size = temArr;

          //循环处理数据
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          //临时数组
          this.images.large_size = temArr;
        });
    },
    getCommentInfo() {
      //获得评论数据
      this.$axios
        .get(
          `/site/comment/getbypage/goods/${
            this.productId
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.message = response.data.message;
          this.totalCount = response.data.totalcount;
        });
    },
    pageChange(page) {
      this.pageIndex = page;
      this.getCommentInfo();
    },
    pageSizeChange(size) {
      this.pageSize = size;

      if (this.pageIndex == 1) {
          this.getCommentInfo();
      }
    },
    cartAdd(){
        // this.$store.commit("increment",1000)
        console.log(111);
       this.$store.commit("addGoods", {
        goodId: this.productId,
        goodNum: this.buyCount
      });
    }
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProductInfo();
    this.getCommentInfo();
  },
  watch: {
    $route(val, oldValue) {
      console.log(val);
      console.log(oldValue);
      this.productId = val.params.id;

      this.images.normal_size = [];
      this.getProductInfo();
      this.getCommentInfo();
    }
  }
};
</script>
<style>
.tab-content img {
  display: block;
  max-width: 100%;
}
.pic-box {
  width: 415px;
}
.drift-zoom-pane {
    border-radius: 50%;
    width: 150px;
    height: 150px;
}
</style>
