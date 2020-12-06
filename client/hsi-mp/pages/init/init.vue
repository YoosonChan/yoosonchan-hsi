<template>
	<view class="h-init-container">
		<view class="h-init-title">请选择您的身份：</view>
		<button @getuserinfo="handleTapParent"  class="h-init-btn h-primary" open-type="getUserInfo" type="primary">家长</button>
		<button @getuserinfo="handleTapTeacher"  class="h-init-btn h-orange" open-type="getUserInfo" type="primary">教师</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onShow() {
		// uni.clearStorage()
		console.log('oEmYbwH9uVd4RKJk7ZZg6SzL6tTo')
		uni.setStorageSync('OPENID', 'oEmYbwH9uVd4RKJk7ZZg6SzL6tTo')
	},
	methods: {
		// openid:oIF374m3QVo-U72zzZT3t1h6gkOM
		// 处理选择家长
		handleTapParent(e) {
			console.log('*****info*****')
			console.log(e.detail)
			uni.setStorageSync('ROLE', 0)
			uni.setStorageSync('USERINFO', e.detail.userInfo)
			console.log(uni.getStorageSync('ROLE'))
			// -----------------------------
			uni.request({
				url: 'http://127.0.0.1:8888/getParentStatus',
				data: {
					openid: 'oEmYbwH9uVd4RKJk7ZZg6SzL6tTo'
					// openid: '1'
				},
				success(res) {
					let data = res.data.data
					console.log(res.data.data)
					if (data) {
						if (data.status) {
							uni.setStorageSync('ID', data.id)
							uni.switchTab({
							    url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								title: '绑定审核中',
								duration: 1000
							})
						}
					} else {
						uni.navigateTo({
							url: '/pages/init/parent/parentBaseInfo/parentBaseInfo'
						})
					}
				}
			})
			
			
		},
		// 处理选择教师
		handleTapTeacher(e) {
			console.log('*****info*****');
			console.log(e.detail);
			uni.setStorageSync('ROLE', 1)
			uni.setStorageSync('USERINFO', e.detail.userInfo)
			console.log(uni.getStorageSync('ROLE'));
			// ---------------------------------------
			uni.request({
				url: 'http://127.0.0.1:8888/getTeacherStatus',
				data: {
					openid: 'oEmYbwH9uVd4RKJk7ZZg6SzL6tTo'
					// openid: '1'
				},
				success(res) {
					let data = res.data.data
					console.log(res.data.data)
					if (data) {
						if (data.status) {
							uni.setStorageSync('ID', data.id)
							uni.switchTab({
							    url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								title: '绑定审核中',
								duration: 1000
							})
						}
					} else {
						uni.navigateTo({
							url: '/pages/init/teacher/teacherBaseInfo/teacherBaseInfo'
						})
					}
				}
			})
		}
	}
};
</script>

<style lang="less">
// 主色调
@primary-color: #00873a;
@orange: #fcb421;
// 间隔
@primary-space: 16 * 2rpx;
// 字体大小
@primary-font-size: 14 * 2rpx;
// 字体颜色
@primary-light: rgba(0, 0, 0, 0.45);
@primary-base: rgba(0, 0, 0, 0.65);
@primary-dark: #101010;
// 圆角
@primary-radius: 5 * 2rpx;
.h-init-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 100vw;
	height: 100vh;
	padding: 18% 0 24%;
	box-sizing: border-box;
	.h-init-title {
		font-size: 28 * 2rpx;
		color: @primary-base;
	}
	.h-init-btn {
		width: 180 * 2rpx;
		height: 180 * 2rpx;
		border-radius: 180rpx;
		line-height: 180 * 2rpx;
		text-align: center;
		font-size: 28 * 2rpx;
		color: #fff;
		&.h-primary {
			background-color: @primary-color;
		}
		&.h-orange {
			background-color: @orange;
		}
	}
}
</style>
