<template>
	<view class="h-release-container">
		<template v-for="item in data">  
			<view :key="item.id" @tap="handleReleaseInfo(item)" class="h-flex-between h-release-item">
				<view style="width: 50%;">
					<view class="h-release-title">{{item.title}}</view>
					<view class="h-release-class">{{item.class}}</view>
				</view>
				<view class="h-release-name">
					<text>{{transTime(item.updatedAt)}}</text>
				</view>
			</view>
		</template>
		<h-modal
			:title="modalParams.item.title"
			:visible="modalParams.visible"
			@close="this.modalParams.visible = false"
			>
				<view slot="subtitle" class="h-flex-between">
					<text>{{modalParams.item.teacher}}</text>
					<text>{{modalParams.item.class}}</text>
					<text>{{transTime(modalParams.item.updatedAt)}}</text>
				</view>
				<view slot="content">
					<view>
						<h-tag color="orange" style="margin-right: 16rpx;">公告</h-tag>
					</view>
					{{modalParams.item.content}}
				</view>
				<view class="h-flex-center" slot="footer">
					<text @tap="handleDeleteRelease(modalParams.item.id)" style="font-size: 24rpx; color: red; margin: 0 16rpx;">删除</text>
				</view>
			</h-modal>
	</view>
</template>

<script>
	import data from './config/list'
	export default {
		data() {
			return {
				data,
				url: 'http://127.0.0.1:8888/getRelease',
				del: 'http://127.0.0.1:8888/releaseDel',
				teacherId: uni.getStorageSync('ID'),
				role: uni.getStorageSync('ROLE'),
				modalParams: {
					visible: false,
					item: {}
				}
			};
		},
		onShow() {
			// console.log(this.data);
			this.getList()
		},
		methods: {
			getList() {
				let that = this
				// console.log(this.data);
				uni.request({
					url: this.url,
					data: {
						teacherId: this.teacherId
					},
					success(res) {
						console.log(res.data.data)
						that.data = res.data.data
					}
				})
			},
			transTime(time) {
				let _time = new Date(time)
				return `${_time.getFullYear()}/${_time.getMonth() + 1}/${_time.getDate()} ${_time.getHours() < 10 ? ('0' + _time.getHours()) : _time.getHours()}:${_time.getMinutes() < 10 ? ('0' + _time.getMinutes()) : _time.getMinutes()}:${_time.getSeconds() < 10 ? ('0' + _time.getSeconds()) : _time.getSeconds()}`
			},
			handleReleaseInfo(value) {
				this.modalParams.visible = true
				this.modalParams.item = value
			},
			handleDeleteRelease(ids) {
				let that = this
				console.log(ids);
				uni.request({
					url: this.del,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {ids},
					success(res) {
						console.log(res)
						uni.showToast({
							title: '删除成功',
							duration: 1000
						})
						that.getList()
						that.modalParams.visible = false
					},
					fail(err) {
						console.log(res)
						uni.showToast({
							title: '删除失败',
							duration: 1000
						})
						that.getList()
						that.modalParams.visible = false
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.h-release-container {
	.h-release-item {
		height: 108rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
		.h-release-title {
			width: 100%;
			font-size: 40rpx;
			color: rgba(0, 0, 0, .75);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.h-release-class {
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.65);
		}
		.h-release-tag {
			margin-right: 16rpx;
		}
		.h-release-name {
			text-align: right;
			font-size: 28rpx;
			color: rgba(0, 0, 0, .65);
		}
	}
}
</style>
