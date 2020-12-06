<template>
	<view class="h-info-container">
		<!-- 列表 -->
		<view @click="handleShowInfo(item)" v-for="item in list" :key="item.id" class="h-info-item">
			<view class="h-info-title h-flex-between">
				<view>{{ item.title }}</view>
				<h-tag v-if="item.type">{{item.course}}</h-tag>
			</view>
			<view class="h-info-content">{{ item.content }}</view>
			<view class="h-info-footer h-flex-between">
				<view>
					<h-tag v-if="item.type" color="primary">作业</h-tag>
					<h-tag v-else color="orange">公告</h-tag>
				</view>
				<view>{{ item.teacher }}</view>
				<view>{{ item.class }}</view>
				<view>{{ transTime(item.updatedAt) }}</view>
			</view>
		</view>
		<!-- 列表 end -->
		<!-- 详细信息 -->
		<h-modal
			:title="infoParams.title"
			:visible="modalVisible"
			:width="360"
			@close="modalVisible = false"
			>
			<view slot="subtitle">
				<view style="margin-bottom: 6rpx;">
					<h-tag v-if="infoParams.type" color="primary">作业</h-tag>
					<h-tag v-else color="orange">公告</h-tag>
					<text v-if="infoParams.type" class="h-modal-course">{{infoParams.course}}</text>
				</view>
				<view class="h-flex-between">
					<view>{{infoParams.teacher}} 老师</view>
					<view>{{infoParams.class}}</view>
					<view>{{transTime(infoParams.updatedAt)}}</view>
				</view>
			</view>
			<view slot="content" class="h-modal-content">{{infoParams.content}}</view>
		</h-modal>
		<!-- 详细信息 end -->
	</view>
</template>

<script>
import list from './config/list';

export default {
	data() {
		return {
			list,
			url: 'http://127.0.0.1:8888/releaseList',
			infoParams: {
				id: '',
				title: '',
				content: '',
				type: '',
				teacher: '',
				class: '',
				course: '',
				updateTime: ''
			},
			modalVisible: false
		};
	},
	onLoad() {
	},
	onShow() {
		let that = this
		if ((typeof uni.getStorageSync('ROLE')) === 'string') {
			uni.navigateTo({
				url: '/pages/init/init'
			})
		}
		uni.request({
			url: this.url,
			success(res) {
				console.log(res.data.data)
				that.list = res.data.data
			}
		})
	},
	methods: {
		handleShowInfo (info) {
			this.infoParams = { ...info }
			this.modalVisible = true
		},
		blur(value){
			console.log(value);
		},
		transTime(time) {
			let _time = new Date(time)
			return `${_time.getFullYear()}/${_time.getMonth() + 1}/${_time.getDate()} ${_time.getHours() < 10 ? ('0' + _time.getHours()) : _time.getHours()}:${_time.getMinutes() < 10 ? ('0' + _time.getMinutes()) : _time.getMinutes()}:${_time.getSeconds() < 10 ? ('0' + _time.getSeconds()) : _time.getSeconds()}`
		}
	}
};
</script>

<style lang="less" scoped>
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
.h-info-container {
	padding: @primary-space;
	box-sizing: border-box;
	.h-info-item {
		padding: @primary-space;
		margin-bottom: @primary-space;
		border-radius: @primary-radius;
		box-shadow: 0 1rpx 8rpx @primary-light;
		box-sizing: border-box;
		.h-info-title {
			font-size: 24 * 2rpx;
			color: @primary-dark;
			>view {
				width: 84%;
			}
		}
		.h-info-content {
			margin: @primary-space 0;
			font-size: @primary-font-size;
			color: @primary-base;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.h-info-footer {
			font-size: @primary-font-size;
			color: @primary-light;
		}
	}
}
.h-modal-course {
	margin-left: @primary-space;
	font-size: @primary-font-size;
	color: @primary-base;
}
.h-modal-content {
	font-size: 18 * 2rpx;
	color: @primary-dark;
}
</style>
