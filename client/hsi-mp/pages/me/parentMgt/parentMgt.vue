<template>
	<view class="h-parent-container">
		<template v-for="(classes, index) in data">
			<view :key="index" class="h-parent-item">
				<view class="h-parent-title">{{classes.class}}</view>
				<view v-for="(item, idx) in classes.parents" :key="idx" class="h-parent-list h-flex-between">
					<view class="h-parent-name">{{item.name}}</view>
					<view class="h-parent-call">
						<text>{{item.student}} 家长</text>
						<image @tap="handleCall(item.phone)" src="../../../static/img/me/call.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import data from './config/list'
	export default {
		data() {
			return {
				data,
				url: 'http://127.0.0.1:8888/classStudent',
				teacherId: uni.getStorageSync('ID')
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				let that = this
				// console.log(this.data);
				uni.request({
					url: this.url,
					data: {
						teacherId: that.teacherId
					},
					success(res) {
						console.log(res.data.data)
						that.data = res.data.data
					}
				})
			},
			handleCall(phone) {
				uni.showModal({
				    title: '提示',
				    content: '确定拨打老师电话',
						confirmText: '拨打',
						confirmColor: '#ff0000',
				    success: function (res) {
				        if (res.confirm) {
				            uni.makePhoneCall({
				            	phoneNumber: phone
				            })
				        }
				    }
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.h-parent-container {
	.h-parent-item {
		.h-parent-title {
			height: 108rpx;
			padding-left: 32rpx;
			line-height: 108rpx;
			font-weight: 700;
			font-size: 40rpx;
			color: rgba(0, 0, 0, 0.45);
			box-shadow: 0 2rpx 2rpx 0 rgba(0, 0, 0, 0.4);
		}
		.h-parent-list {
			height: 72rpx;
			padding: 0 32rpx;
			line-height: 72rpx;
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.45);
			box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
			box-sizing: border-box;
			.h-parent-call {
				display: flex;
				align-items: center;
				image {
					width: 28rpx;
					height: 28rpx;
					margin-left: 16rpx;
					transform: rotate(270deg);
				}
			}
		}
	}
}
</style>
