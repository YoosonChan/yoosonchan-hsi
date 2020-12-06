<!-- 
	模态框组件 @by yoosonchan
	【params】
		title -------- 模态框标题
		visible ------ 显示
		width -------- 模态框宽度
		fixedHeight -- 模态框内容固定高度
	【event】
		@close ------- 关闭模态框方法
 -->
<template>
	<view class="h-modal-mask" v-if="visible">
		<view class="h-modal" :style="{ width: width * 2 + 'rpx' }">
			<!-- 关闭按钮 -->
			<view class="h-modal-close" @click="handleClose">×</view>
			<!-- 标题 -->
			<view class="h-modal-title">
				<text>{{ title }}</text>
				<slot name="title"></slot>
			</view>
			<!-- 副标题 -->
			<view class="h-modal-subtitle"><slot name="subtitle"></slot></view>
			<!-- 内容 -->
			<view class="h-modal-content" :style="{ height: fixedHeight * 2 + 'rpx' }"><slot name="content"></slot></view>
			<!-- 底部操作 -->
			<view class="h-modal-footer"><slot name="footer"></slot></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		// 模态框标题
		title: String,
		// 显示
		visible: {
			default: false
		},
		// 模态框宽度
		width: {
			default: 300
		},
		// 内容固定高度
		fixedHeight: {
			default: 180
		}
	},
	methods: {
		handleClose() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="less" scoped>
@primary-color: rgba(0, 0, 0, 0.65);
@primary-font-size: 14 * 2rpx;
@mask-color: rgba(0, 0, 0, 0.45);
@border-radius: 5 * 2rpx;
@modal-space: 16 * 2rpx;
@title-font-size: 20 * 2rpx;
@title-color: #101010;
@content-font-size: 14 * 2 rpx;
@content-color: #101010;

.h-modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 996;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: @mask-color;
	.h-modal {
		position: relative;
		padding: @modal-space;
		border: 1rpx solid #f8f8f8;
		border-radius: @border-radius;
		background-color: #fff;
		box-sizing: border-box;
		.h-modal-close {
			position: absolute;
			top: 16 * 2rpx;
			right: 16 * 2rpx;
			font-size: 18 * 2rpx;
			font-weight: 900;
			color: rgba(0, 0, 0, 0.45);
			&:hover {
				color: rgba(0, 0, 0, 0.65);
			}
		}
		.h-modal-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 84%;
			font-size: @title-font-size;
			color: @title-color;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.h-modal-subtitle {
			margin: @modal-space 0;
			color: @primary-color;
			font-size: @primary-font-size;
		}
		.h-modal-content {
			overflow-y: scroll;
			font-size: @content-font-size;
			color: @content-color;
			&::-webkit-scrollbar {
				width: 3 * 2rpx;
				display: none;
			}
		}
		.h-modal-footer {
			display: flex;
			justify-content: center;
			margin-top: @modal-space;
		}
	}
}
</style>
