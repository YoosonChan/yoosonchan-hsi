<template>
	<view class="h-work-container">
		<template v-for="item in data">  
			<view :key="item.id" @tap="handleWorkInfo(item)" class="h-flex-between h-work-item">
				<view style="width: 50%;">
					<view class="h-work-title">{{item.title}}</view>
					<view class="h-work-class">{{item.class}}</view>
				</view>
				<view>
					<view class="h-work-tag">
						<h-tag color="primary">{{item.course}}</h-tag>
					</view>
					<view class="h-work-name">
						<text>{{transTime(item.updatedAt)}}</text>
					</view>
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
						<h-tag color="primary" style="margin-right: 16rpx;">作业</h-tag>
						<text style="font-size: 28rpx; color: rgba(0, 0, 0, .65);">{{modalParams.item.course}}</text>
					</view>
					<text>{{modalParams.item.content}}</text>
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
				url: 'http://127.0.0.1:8888/getWork',
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
			handleWorkInfo(value) {
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
.h-work-container {
	.h-work-item {
		height: 108rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
		.h-work-title {
			width: 100%;
			font-size: 40rpx;
			color: rgba(0, 0, 0, .75);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.h-work-class {
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.65);
		}
		.h-work-tag {
			margin-right: 16rpx;
		}
		.h-work-name {
			text-align: right;
			font-size: 28rpx;
			color: rgba(0, 0, 0, .65);
		}
	}
}
</style>
