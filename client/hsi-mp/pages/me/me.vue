<template>
	<view class="h-me-container">
		<view class="h-me-hbc"></view>
		<view class="h-me-info">
			<view class="h-me-profile">
				<image v-if="avatarUrl" :src="avatarUrl" mode="aspectFill"></image>
				</view>
			<!-- 角色 -->
			<view class="h-me-title">
				<text class="h-me-name">{{ !!role ? '问沛容' : '陈元化' }}</text>
				<text v-if="role === 0" class="h-me-role">家长</text>
				<text v-if="role === 1" class="h-me-role">教师</text>
			</view>
			<!-- 角色 end-->
			<!-- 基本信息 -->
			<template v-if="role === 0">
				<swiper class="h-me-swiper" :indicator-dots="true" :circular="true" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="rgba(0, 0, 0, .3)">
					<template v-for="item in students">
						<navigator :url="'/pages/me/gradeMgt/gradeMgt?studentId=' + item.id + '&student=' + item.name" :key="item.id">
							<swiper-item class="swiper-item">
								<text class="title">{{ item.name }} | {{ item.id }}</text>
								<text>{{ item.class }}</text>
								<text>班主任：{{ item.headmaster }} 老师</text>
							</swiper-item>
						</navigator>
					</template>
				</swiper>
			</template>
			<template v-if="role === 1">
				<swiper class="h-me-swiper" :indicator-dots="true" :circular="true" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="rgba(0, 0, 0, .3)">
					<template v-for="(item, index) in classes">
						<navigator :url="'/pages/me/gradeMgt/gradeMgt?classId=' + item.classId + '&class=' + item.class" :key="index">
							<swiper-item class="swiper-item">
								<text class="title">{{ item.class }} | {{ item.course }}</text>
								<text>{{ item.name }} | {{ item.teacherId }}</text>
								<text>班主任：{{ item.headmaster }} 老师</text>
							</swiper-item>
						</navigator>
					</template>
				</swiper>
			</template>
			<!-- 基本信息 end-->
			<!-- 选项 -->
			<view class="h-me-option">
				<template v-if="role === 0">
					<navigator url="/pages/me/feedbackMgt/feedbackMgt" class="h-me-item">
						<image src="/static/img/me/feedback.png" mode="aspectFill"></image>
						<text>反馈管理</text>
					</navigator>
					<navigator url="/pages/me/courseMgt/courseMgt" class="h-me-item">
						<image src="/static/img/me/course.png" mode="aspectFill"></image>
						<text>课程管理</text>
					</navigator>
					<view class="h-me-item" @tap="handleExchange">
						<image src="/static/img/me/exchange.png" mode="aspectFill"></image>
						<text>切换账号</text>
					</view>
				</template>
				<template v-if="role === 1">
					<navigator url="/pages/me/feedbackMgt/feedbackMgt" class="h-me-item">
						<image src="/static/img/me/feedback.png" mode="aspectFill"></image>
						<text>反馈管理</text>
					</navigator>
					<navigator url="/pages/me/releaseMgt/releaseMgt" class="h-me-item">
						<image src="/static/img/me/notice.png" mode="aspectFill"></image>
						<text>公告管理</text>
					</navigator>
					<navigator url="/pages/me/workMgt/workMgt" class="h-me-item">
						<image src="/static/img/me/homework.png" mode="aspectFill"></image>
						<text>作业管理</text>
					</navigator>
					<navigator url="/pages/me/parentMgt/parentMgt" class="h-me-item">
						<image src="/static/img/me/parent.png" mode="aspectFill"></image>
						<text>家长管理</text>
					</navigator>
					<view class="h-me-item" @tap="handleExchange">
						<image src="/static/img/me/exchange.png" mode="aspectFill"></image>
						<text>切换账号</text>
					</view>
					<template v-if="role === 1">
						<view class="h-me-item" style="box-shadow: none;"></view>
					</template>
				</template>
			</view>
			<!-- 选项 end-->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarUrl: uni.getStorageSync('ROLE'),
			// 角色 0->家长, 1->教师
			role: null,
			url: {
				teacher: 'http://127.0.0.1:8888/teacherBase',
				parent: 'http://127.0.0.1:8888/studentBase'
			},
			parentId: uni.getStorageSync('ID'),
			teacherId: uni.getStorageSync('ID'),
			students: [{ id: '169001427', name: '张三', class: '1690014班', headmaster: '麻子' }, { id: '169001428', name: '李四', class: '1690014班', headmaster: '麻子' }],
			classes: [
				{ classId: 0, class: '1690013班', courseId: 0, course: '课程0', teacherId: '001', name: '张三', headmaster: '张三' },
				{ classId: 1, class: '1690014班', courseId: 0, course: '课程0', teacherId: '001', name: '张三', headmaster: '张三' }
			]
		};
	},
	onShow() {
		console.log(this.role, '<-1', uni.getStorageSync('ROLE'), '<-2', uni.getStorageSync('USERINFO'), '<-3', uni.getStorageSync('ID'), '<-3');
		this.parentId = this.role === 0 ? uni.getStorageSync('ID') : '';
		this.teacherId = this.role === 1 ? uni.getStorageSync('ID') : '';
		this.role = uni.getStorageSync('ROLE');
		this.avatarUrl = uni.getStorageSync('USERINFO').avatarUrl;
		// this.$forceUpdate()
		if (typeof uni.getStorageSync('ROLE') === 'string') {
			uni.navigateTo({
				url: '/pages/init/init'
			});
		} else {
			this.getList();
		}
	},
	methods: {
		getList() {
			let that = this;
			// console.log(this.data);
			if (this.role === 0) {
				uni.request({
					url: this.url.parent,
					data: {
						// id: that.parentId
						id: uni.getStorageSync('ID')
					},
					success(res) {
						console.log(res.data.data);
						that.students = res.data.data;
					}
				});
			} else if (this.role === 1) {
				uni.request({
					url: this.url.teacher,
					data: {
						// teacherId: that.teacherId,
						teacherId: uni.getStorageSync('ID')
					},
					success(res) {
						console.log(res.data.data);
						that.classes = res.data.data;
					}
				});
			}
		},
		// 切换账号
		handleExchange() {
			uni.clearStorageSync();
			uni.navigateTo({
				url: '/pages/init/init'
			});
		}
	}
};
</script>

<style lang="less">
.h-me-container {
	position: relative;
	.h-me-hbc {
		height: 480rpx;
		background-color: #00873a;
	}
	.h-me-info {
		position: absolute;
		top: 200rpx;
		left: 0;
		width: 100%;
		padding: 120rpx 54rpx 36rpx;
		border-radius: 96rpx 96rpx 0 0;
		background-color: #fff;
		box-sizing: border-box;
		.h-me-profile {
			position: absolute;
			top: 0;
			left: 50%;
			width: 240rpx;
			height: 240rpx;
			border-radius: 240rpx;
			border: 6rpx solid #fcb421;
			transform: translate(-50%, -50%);
			overflow: hidden;
			background-color: #fff;
			box-shadow: 0 4rpx 8rpx 2rpx rgba(0, 0, 0, 0.15);
			image {
				width: 240rpx;
				height: 240rpx;
			}
		}
		.h-me-title {
			margin-top: 16rpx;
			text-align: center;
			text {
				display: block;
			}
			.h-me-name {
				font-size: 48rpx;
				font-weight: 700;
				color: #101010;
			}
			.h-me-role {
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.65);
			}
		}
		.h-me-swiper {
			margin: 16rpx 0 36rpx;
			border-radius: 10rpx;
			background-color: #fcb421;
			box-shadow: 0 4rpx 12rpx 0 rgba(0, 0, 0, 0.15);
			.swiper-item {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 240rpx;
				padding: 32rpx;
				font-size: 28rpx;
				color: #fff;
				box-sizing: border-box;
				> .title {
					font-size: 40rpx;
					font-weight: 700;
				}
			}
		}
		.h-me-option {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.h-me-item {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				width: 24vw;
				height: 24vw;
				margin: 16rpx 0;
				padding: 32rpx 0;
				border-radius: 10rpx;
				box-shadow: 0 2rpx 8rpx 2rpx rgba(0, 0, 0, 0.15);
				box-sizing: border-box;
				image {
					width: 9vw;
					height: 9vw;
				}
				text {
					font-size: 28rpx;
					color: rgba(0, 0, 0, 0.45);
				}
			}
		}
	}
}
</style>
