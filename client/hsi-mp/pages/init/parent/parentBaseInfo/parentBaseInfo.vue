<template>
	<view class="h-pbi-container h-flex-center">
		<view class="h-pbi-title h-flex-center">填写基本信息</view>
		<view class="h-pbi-info h-flex-center"><h-input :value="name" @change="nameValue" label="姓名"></h-input></view>
		<view class="h-pbi-info h-flex-center"><h-input :value="phone" @change="phoneValue" label="手机号码"></h-input></view>
		<view class="h-pbi-count h-flex-center">
			<view class="h-pbi-label">请选择您需要绑定孩子的数量：</view>
			<view class="h-pbi-input h-flex-center">
				<view class="h-pbi-btn" @tap="childCount > 1 ? childCount-- : ''">-</view>
				<view><input type="text" :value="childCount" read-only /></view>
				<view class="h-pbi-btn" @tap="childCount < 3 ? childCount++ : ''">+</view>
			</view>
		</view>
		<view class="h-flex-center" style="margin: 60rpx 0;"><h-btn @tap="handleNext">下一步</h-btn></view>
		<view class="h-pbi-tips">提醒：初次填写姓名和手机号后，以后将无法更改；如果需要重新更改以上信息，请联系管理员。</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag: 0,
			childCount: 1,
			status: false,
			parentInfo: {
				name: '',
				phone: ''
			}
		};
	},
	methods: {
		handleNext() {
			let that = this
			uni.setStorageSync('INFO', this.parentInfo)
			if (!this.flag) {
				this.flag ++
				uni.request({
					url: 'http://127.0.0.1:8888/parentNew',
					method: 'POST',
					data: {
						...this.parentInfo,
						openid: uni.getStorageSync('OPENID'),
						avatarUrl: uni.getStorageSync('USERINFO').avatarUrl
					},
					success(res) {
						console.log(res);
						uni.request({
							url: 'http://127.0.0.1:8888/getParentStatus',
							data: {
								openid: uni.getStorageSync('OPENID')
							},
							success(res) {
								uni.setStorageSync('ID', res.data.data.id)
								uni.navigateTo({
									url: '../bindChild/bindChild?childCount=' + that.childCount
								})
							}
						})
					}
				})
			}
		},
		nameValue(value) {
			this.parentInfo.name = value
		},
		phoneValue(value) {
			this.parentInfo.phone = value
		}
	}
};
</script>

<style lang="less" scoped>
// 主色调
@primary-color: #00873a;
@orange: #fcb421;
// 间隔
@space: 30 * 2rpx;
// 字体大小
@font-size: 18 * 2rpx;
@count-font-size: 28 * 2rpx;
// 字体颜色
@primary-dark: rgba(0, 0, 0, 0.85);
@primary-base: rgba(0, 0, 0, 0.65);
@primary-light: rgba(0, 0, 0, 0.48);
.h-pbi-container {
	flex-direction: column;
	.h-pbi-title {
		margin: @space 0;
		font-size: 24 * 2rpx;
		color: @primary-dark;
	}
	.h-pbi-info {
		margin-bottom: @space;
	}
	.h-pbi-count {
		flex-direction: column;
		.h-pbi-label {
			font-size: @font-size;
			color: @primary-light;
		}
		.h-pbi-input {
			margin: @space 0;
			.h-pbi-btn {
				width: 48 * 2rpx;
				height: 48 * 2rpx;
				border-radius: 48rpx;
				line-height: 48 * 2rpx;
				text-align: center;
				font-size: @count-font-size;
				font-weight: 700;
				color: #fff;
				background-color: @orange;
			}
			input {
				width: 64 * 2rpx;
				height: 48 * 2rpx;
				margin: 0 24 * 2rpx;
				border: 4rpx solid @primary-light;
				text-align: center;
				font-size: @count-font-size;
				color: @primary-base;
			}
		}
	}
	.h-pbi-tips {
		width: 300 * 2rpx;
		font-size: 12 * 2rpx;
		color: @primary-light;
	}
}
</style>
