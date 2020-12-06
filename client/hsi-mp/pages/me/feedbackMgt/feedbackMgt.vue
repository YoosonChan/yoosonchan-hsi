<template>
	<view class="h-feedback-container">
		<template v-for="item in data">  
			<view :key="item.id" @tap="handleFeedbackInfo(item)" class="h-flex-between h-feedback-item">
				<text v-if="item.status === 2" class="h-feedback-unread">●</text>
				<view class="h-feedback-title">
					<text>{{item.title}}</text>
				</view>
				<view class="h-feedback-tag">
					<h-tag v-if="item.type === 0" color="primary">学生问题反馈</h-tag>
					<h-tag v-if="item.type === 1" color="orange">课程问题反馈</h-tag>
					<h-tag v-if="item.type === 2" color="orange">老师问题反馈</h-tag>
					<h-tag v-if="item.type === 3" color="primary">作业问题反馈</h-tag>
					<h-tag v-if="item.type === 4">统计反馈</h-tag>
				</view>
				<view class="h-feedback-name">
					<text v-if="role === 0">{{item.teacher}} 老师</text>
					<text v-if="role === 1">{{item.parent}} 家长</text>
				</view>
			</view>
		</template>
		<h-modal
			:title="modalParams.item.title"
			:visible="modalParams.visible"
			@close="this.modalParams.visible = false"
			>
				<view slot="subtitle" class="h-flex-between">
					<div style="width: 40%;">
						<h-tag v-if="modalParams.item.type === 0" color="primary">学生问题反馈</h-tag>
						<h-tag v-if="modalParams.item.type === 1" color="orange">课程问题反馈</h-tag>
						<h-tag v-if="modalParams.item.type === 2" color="orange">老师问题反馈</h-tag>
						<h-tag v-if="modalParams.item.type === 3" color="primary">作业问题反馈</h-tag>
						<h-tag v-if="modalParams.item.type === 4">统计反馈</h-tag>
					</div>
					<div style="width: 20%;">
						<text v-if="role === 0">{{modalParams.item.teacher}} 老师</text>
						<text v-if="role === 1">{{modalParams.item.parent}} 家长</text>
					</div>
					<div style="width: 30%; text-align: right;">{{transTime(modalParams.item.updatedAt)}}</div>
				</view>
				<view slot="content">
					{{modalParams.item.content}}
				</view>
				<view class="h-flex-center" slot="footer">
					<template v-if="role === 0">
						<h-btn @tap="handleChangeState(modalParams.item, 0)" v-if="modalParams.item.status === 1" color="orange" size="sm">已解决</h-btn>
						<text @tap="handleDeleteFeedback(modalParams.item.id)" style="font-size: 24rpx; color: red; margin: 0 16rpx;">删除</text>
					</template>
					<template v-if="role === 1">
						<h-btn @tap="handleChangeState(modalParams.item, 1)" v-if="modalParams.item.status === 2" size="sm" color="primary">已接收</h-btn>
					</template>
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
				teacherId: this.role === 1 ? uni.getStorageSync('ID') : '',
				parentId: this.role === 0 ? uni.getStorageSync('ID') : '',
				url: 'http://127.0.0.1:8888/feedback',
				del: 'http://127.0.0.1:8888/feedbackDel',
				update: 'http://127.0.0.1:8888/feedbackNew',
				role: uni.getStorageSync('ROLE'),
				modalParams: {
					visible: false,
					item: {}
				}
			};
		},
		onShow() {
			this.role = uni.getStorageSync('ROLE')
			this.teacherId = this.role === 1 ? uni.getStorageSync('ID') : '',
			this.parentId = this.role === 0 ? uni.getStorageSync('ID') : '',
			this.getList()
			console.log(this.teacherId, this.parentId);
		},
		methods: {
			getList() {
				let that = this
				// console.log(this.data);
				uni.request({
					url: this.url,
					data: {
						parentId: this.parentId,
						teacherId: this.teacherId
					},
					success(res) {
						console.log(res.data.data)
						that.data = res.data.data
					}
				})
			},
			handleFeedbackInfo(value) {
				this.modalParams.visible = true
				this.modalParams.item = value
			},
			handleDeleteFeedback(ids) {
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
			},
			transTime(time) {
				let _time = new Date(time)
				return `${_time.getFullYear()}/${_time.getMonth() + 1}/${_time.getDate()} ${_time.getHours() < 10 ? ('0' + _time.getHours()) : _time.getHours()}:${_time.getMinutes() < 10 ? ('0' + _time.getMinutes()) : _time.getMinutes()}:${_time.getSeconds() < 10 ? ('0' + _time.getSeconds()) : _time.getSeconds()}`
			},
			handleChangeState (values, status = 2) {
				let that = this
				console.log(values);
				uni.request({
					url: this.update,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						...values,
						status
					},
					success(res) {
						console.log(res)
						uni.showToast({
							title: '成功',
							duration: 1000
						})
						that.getList()
						that.modalParams.visible = false
					},
					fail(err) {
						console.log(res)
						uni.showToast({
							title: '发生错误',
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
.h-feedback-container {
	.h-feedback-item {
		position: relative;
		height: 108rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.15);
		.h-feedback-title {
			position: relative;
			width: 40%;
			font-size: 40rpx;
			color: rgba(0, 0, 0, .75);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.h-feedback-tag {
			width: 30%;
		}
		.h-feedback-name {
			width: 30%;
			text-align: right;
			font-size: 28rpx;
			color: rgba(0, 0, 0, .65);
		}
		.h-feedback-unread {
			position: absolute;
			top: 36%;
			left: 8rpx;
			font-size: 24rpx;
			color: red;
		}
	}
}
</style>
