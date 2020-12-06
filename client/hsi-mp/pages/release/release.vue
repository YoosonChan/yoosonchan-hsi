<template>
	<view class="h-release-container">
		<!-- 家长发布 -->
		<template v-if="!role">
			<form @submit="handleFeedback">
				<view class="h-form h-flex-between">
					<view class="h-form-header">
						<text>反馈</text>
					</view>
					<view class="h-form-item">
						<view class="h-form-label">标题</view>
						<input class="h-form-input" name="title" type="text" />
					</view>
					<view class="h-form-item">
						<view class="h-form-label">选择问题类型</view>
						<picker class="h-form-input" name="type" :value="typeIndex" :range="typeRangeOfParent" range-key="value" @change="handleChangeType" mode="selector">
							<view>{{typeRangeOfParent[typeIndex].value}}</view>
						</picker>
					</view>
					<view class="h-form-item">
						<view class="h-form-label">选择老师</view>
						<picker class="h-form-input" name="teacherId" :value="teacherIndex" :range="teacherRange" range-key="name" @change="handleChangeTeacher" mode="selector">
							<view>{{teacherRange[teacherIndex].name}}</view>
						</picker>
					</view>
					<view class="h-form-item">
						<view class="h-form-label">反馈内容</view>
						<textarea class="h-form-input textarea" name="content" />
					</view>
					<button class="h-form-btn" form-type="submit">提交</button>
				</view>
			</form>
		</template>
		<!-- 家长发布 end-->
		<!-- 教师发布 -->
		<template v-if="!!role">
			<form @submit="handleRelease">
				<view class="h-form h-flex-between">
					<view class="h-form-header">
						<text>发布</text>
					</view>
					<view class="h-form-item">
						<view class="h-form-label">标题</view>
						<input class="h-form-input" name="title" type="text" />
					</view>
					<view class="h-form-item">
						<view class="h-form-label">选择发布类型</view>
						<picker class="h-form-input" name="type" :value="typeIndex" :range="typeRangeOfTeacher" range-key="value" @change="handleChangeType" mode="selector">
							<view>{{typeRangeOfTeacher[typeIndex].value}}</view>
						</picker>
					</view>
					<view class="h-form-item">
						<view class="h-form-label">选择班级</view>
						<picker class="h-form-input" name="classId" :value="classIndex" :range="classRange" range-key="name" @change="handleChangeClass" mode="selector">
							<view>{{classRange[classIndex].name}}</view>
						</picker>
					</view>
					<view class="h-form-item">
						<view class="h-form-label">选择课程</view>
						<picker class="h-form-input" name="courseId" :value="courseIndex" :range="courseRange" range-key="name" @change="handleChangeCourse" mode="selector">
							<view>{{courseRange[courseIndex].name}}</view>
						</picker>
					</view>
					<view class="h-form-item">
						<view class="h-form-label">内容</view>
						<textarea class="h-form-input textarea" name="content" />
					</view>
					<button class="h-form-btn" style="margin-bottom: 64rpx;" form-type="submit">提交</button>
				</view>
			</form>
		</template>
		<!-- 教师发布 end-->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 角色 0->家长, 1->教师
			role: '',
			teacherId: uni.getStorageSync('ID'),
			parentId: uni.getStorageSync('ID'),
			url: {
				class: 'http://127.0.0.1:8888/classListmp',
				course: 'http://127.0.0.1:8888/courseListmp',
				teacher: 'http://127.0.0.1:8888/teacherList',
				release: 'http://127.0.0.1:8888/releaseNew',
				feedback: 'http://127.0.0.1:8888/feedbackNew'
			},
			typeIndex: 0,
			typeName: '',
			/**
			 * 家长相关参数
			 */
			teacherIndex: 0,
			typeRangeOfParent: [{key: 0, value: '学生'}, {key: 1, value: '课程'}, {key: 2, value: '教师'}, {key: 3, value: '作业'}, {key: 4, value: '统计'}],
			// TODO 接口赋值
			teacherRange: [{ id: '001', name: '张三' }, { id: '002', name: '李四' }],
			/**
			 * 老师相关参数
			 */
			classIndex: 0,
			classRange: [{ id: 0, name: '1690013班' }, { id: 1, name: '1690014班' }],
			courseIndex: 0,
			courseRange: [{ id: 0, name: '课程0' }, { id: 1, name: '课程1' }],
			typeRangeOfTeacher: [{key: 0, value: '公告'}, {key: 1, value: '作业'}, {key: 2, value: '统计'}],
		};
	},
	onShow() {
		this.role = uni.getStorageSync('ROLE')
		if (typeof uni.getStorageSync('ROLE') === 'string') {
			uni.navigateTo({
				url: '/pages/init/init'
			})
		} else {
			this.getList()
		}
	},
	methods: {
		getList() {
			let that = this
			// console.log(this.data);
			if(this.role === 0) {
				uni.request({
					url: this.url.teacher,
					// data: {
					// 	id: that.parentId
					// },
					success(res) {
						console.log(res.data.data)
						that.teacherRange = res.data.data
					}
				})
			} else if(this.role === 1) {
				uni.request({
					url: this.url.class,
					data: {
						// teacherId: that.teacherId,
						teacherId: uni.getStorageSync('ID')
					},
					success(res) {
						console.log(res.data.data)
						that.classRange = res.data.data
					}
				})
				uni.request({
					url: this.url.course,
					data: {
						// teacherId: that.teacherId,
						teacherId: uni.getStorageSync('ID')
					},
					success(res) {
						console.log(res.data.data)
						that.courseRange = res.data.data
					}
				})
			}
		},
		// 处理类型改变
		handleChangeType(e) {
			this.typeIndex = e.detail.value;
			console.log(e.detail.value);
		},
		// 处理老师改变
		handleChangeTeacher(e) {
			this.teacherIndex = e.detail.value;
			console.log(e.detail.value);
		},
		// 处理班级改变
		handleChangeClass(e) {
			this.classIndex = e.detail.value;
			console.log(e.detail.value);
		},
		// 处理课程改变
		handleChangeCourse(e) {
			this.courseIndex = e.detail.value;
			console.log(e.detail.value);
		},
		// 处理反馈
		handleFeedback(e) {
			let values = e.detail.value;
			values.teacherId = this.teacherRange[values.teacherId].id
			console.log('反馈：', { ...values, parentId: uni.getStorageSync('ID') });
			uni.request({
				url: this.url.feedback,
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					...values,
					parentId: uni.getStorageSync('ID')
},
				success(res) {
					console.log(res.data.data)
					uni.showToast({
						title: '反馈成功',
						duration: 1000
					})
				},
				fail(err) {
					console.log(err);
					uni.showToast({
						title: '反馈失败',
						duration: 1000
					})
				}
			})
		},
		// 处理发布
		handleRelease(e) {
			let values = e.detail.value;
			values.classId = this.classRange[values.classId].id
			values.courseId = this.courseRange[values.courseId].id
			console.log('发布：', { ...values, teacherId: uni.getStorageSync('ID')});
			uni.request({
				url: this.url.release,
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					...values,
					teacherId: uni.getStorageSync('ID')
				},
				success(res) {
					console.log(res.data.data)
					uni.showToast({
						title: '发布成功',
						duration: 1000
					})
				},
				fail(err) {
					console.log(err);
					uni.showToast({
						title: '发布失败',
						duration: 1000
					})
				}
			})
		}
	},
};
</script>

<style lang="less" scoped>
.h-release-container {
}
.h-form {
	flex-direction: column;
	.h-form-header {
		margin: 32rpx 8rpx;
		color: rgba(0, 0, 0, 0.85);
		font-size: 56rpx;
	}
	.h-form-item{
		width: 560rpx;
		margin-bottom: 48rpx;
		.h-form-label {
			margin-bottom: 16rpx;
			color: rgba(0, 0, 0, 0.65);
			font-size: 28rpx;
		}
		.h-form-input {
			height: 96rpx;
			padding: 16rpx;
			border: 2rpx solid rgba(187, 187, 187, 1);
			border-radius: 12rpx;
			line-height: 64rpx;
			font-size: 28rpx;
			color: #bbb;
			box-sizing: border-box;
			&.textarea {
				height: 192rpx;
				line-height: 1.2;
			}
		}
	}
	.h-form-btn {
		width: 512rpx;
		height: 96rpx;
		border-radius: 96rpx;
		line-height: 96rpx;
		font-size: 40rpx;
		text-align: center;
		color: #fff;
		background-color: #00873A;
	}
}
</style>
