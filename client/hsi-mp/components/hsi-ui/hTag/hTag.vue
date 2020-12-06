<!-- 
	标签组件 @by yoosonchan
	【params】
		color -------- 标签颜色 [primary, orange] 
 -->
<template>
	<view
		class="h-tag"
		:class="{
			'h-tag-primary': color === 'primary',
			'h-tag-orange': color === 'orange'
		}"
		>
		<slot></slot>
		</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		color: {
			default: ''
		}
	}
};
</script>

<style lang="less" scoped>
@primary-color: #00873a;
@orange: #fcb421;
@primary-size: 14 * 2rpx;
@primary-height: 24 * 2rpx;
@primary-space: 6 * 2rpx;
@primary-radius: 5 * 2rpx;
.h-tag {
	display: inline-block;
	height: @primary-height;
	line-height: @primary-height;
	border-radius: @primary-radius;
	padding: 0 @primary-space;
	font-size: @primary-size;
	background-color: rgba(0, 0, 0, .45);
	color: #fff;
	&.h-tag-primary {
		background-color: @primary-color;
	}
	&.h-tag-orange {
		background-color: @orange;
	}
}
</style>
