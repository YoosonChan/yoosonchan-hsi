<template>
	<view class="h-tbi-container h-flex-center">
		<view class="h-tbi-title h-flex-center">填写基本信息</view>
		<view class="h-tbi-info h-flex-center"><h-input label="工号" @change="idValue"></h-input></view>
		<view class="h-tbi-info h-flex-center"><h-input label="手机号码" @change="phoneValue"></h-input></view>
		<view class="h-flex-center"><h-btn @tap="handleBind">绑定</h-btn></view>
		<view class="h-tbi-tips">提醒：初次填写工号和手机号码后，以后将无法更改；如果需要重新更改以上信息，请联系管理员。</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag: 0,
			teacherInfo: {
				id: '',
				phone: ''
			}
		};
	},
	methods: {
		handleBind() {
			let that = this
			console.log('绑定');
			console.log(this.teacherInfo);
			uni.setStorageSync('INFO', this.teacherInfo)
			if (!this.flag) {
				this.flag ++
				uni.request({
					url: 'http://127.0.0.1:8888/getTeacherId',
					data: {
						id: that.teacherInfo.id
					},
					success(res) {
						if (res.data.data) {
							let data = res.data.data
							uni.request({
								url: 'http://127.0.0.1:8888/teacherBind',
								method: 'POST',
								data: {
									...that.teacherInfo,
									openid: uni.getStorageSync('OPENID'),
									avatarUrl: uni.getStorageSync('USERINFO').avatarUrl,
									name: data.name
								},
								success() {
									uni.showToast({
										title: '等待审核',
										duration: 1000,
										success() {
											uni.navigateTo({
												url: '/pages/init/init'
											})
										}
									})
								},
								fail() {
									uni.showToast({
										title: '绑定失败',
										duration: 1000
									})
									that.flag = 0
								}
							})
						} else {
							uni.showToast({
								title: '未找到该老师',
								duration: 1000
							})
							that.flag = 0
						}
					}
				})
			}
			// uni.navigateTo({
			// 	url: '../bindChild/bindChild?childCount=' + this.childCount
			// });
		},
		idValue(value) {
			this.teacherInfo.id = value
		},
		phoneValue(value) {
			this.teacherInfo.phone = value
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
.h-tbi-container {
	flex-direction: column;
	.h-tbi-title {
		margin: @space 0;
		font-size: 24 * 2rpx;
		color: @primary-dark;
	}
	.h-tbi-info {
		margin-bottom: @space;
	}
	.h-tbi-tips {
		width: 300 * 2rpx;
		margin: @space;
		font-size: 12 * 2rpx;
		color: @primary-light;
	}
}
</style>
