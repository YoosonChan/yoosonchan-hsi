<!-- 
	按钮组件 @by yoosonchan
	【params】
		color -------- 按钮颜色 [只支持 orange] 
		size ------ 按钮大小 [只支持sm]
	【event】
		@tap ------- 按钮点击事件
 -->
<template>
	<view
		class="h-btn"
		:class="{
			'h-sm-btn': size === 'sm',
			'h-orange-btn': color === 'orange'
			}"
		 @tap="handleTap"
		>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			color: {
				default: ''
			},
			size: {
				default: ''
			}
		},
		methods: {
			handleTap () {
				this.$emit('tap')
			}
		}
	}
</script>

<style lang="less">
// 颜色
@default-bgc: #00873A;
@orange-bgc: #FCB421;
// 宽度
@default-width: 256 * 2rpx;
@sm-width: 128 * 2rpx;
// 高度
@default-height: 48 * 2rpx;
@sm-height: 36 * 2rpx;
// 文本颜色
@default-color: #fff;
// 字体大小
@default-font-size: 20 * 2rpx;
@sm-font-size: 16 * 2rpx;

.h-btn {
	width: @default-width;
	height: @default-height;
	line-height: @default-height;
	border-radius: @default-height;
	background-color: @default-bgc;
	text-align: center;
	font-size: @default-font-size;
	color: @default-color;
	&.h-sm-btn {
		width: @sm-width;
		height: @sm-height;
		line-height: @sm-height;
		font-size: @sm-font-size;
	}
	&.h-orange-btn {
		background-color: @orange-bgc;
	}
}
</style>
