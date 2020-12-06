<template>
	<view class="h-grade-container h-flex-between">
		<view class="h-grade-title">
			<view v-if="role === 0">{{studentName}} 同学</view>
			<view v-if="role === 1">{{className}}</view>
			<view>成绩表</view>
		</view>
		<view>
			<picker
				:value="termIndex"
				:range="terms"
				range-key="name"
				@change="handleChangeTerm"
				mode="selector"
				class="h-grade-select"
				>
				<view>{{terms[termIndex].name}}</view>
			</picker>
		</view>
		<view class="h-grade-table">
			<template v-if="role === 0">
				<view
					v-for="(row, index) in table.student"
					:key="index"
					class="h-grade-row h-flex-between"
					>
					<view
						v-for="(col, i) in row"
						:key="i"
						:style="{backgroundColor: (!!i && !!index) ? '#fff' : '#eee'}"
						class="h-grade-col"
						>{{col}}</view>
				</view>
			</template>
			<template v-if="role === 1">
				<view
					v-for="(row, index) in table.classes"
					:key="index"
					class="h-grade-row h-flex-between"
					>
					<view
						v-for="(col, i) in row"
						:key="i"
						:style="{backgroundColor: (!!i && !!index) ? '#fff' : '#eee'}"
						class="h-grade-col"
						>{{col}}</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import classes from './config/class';
	import student from './config/student';
	export default {
		data() {
			return {
				role: uni.getStorageSync('ROLE'),
				// 关于老师的参数
				classId: '',
				className: '',
				// 关于家长的参数
				studentId: '',
				studentName: '',
				// 公共参数
				termId: '',
				// 学期列表
				termIndex: 0,
				terms: [{id: 0, name: '2019-2020年上学期'}, {id: 1, name: '2019-2020年下学期'}],
				table: {
					classes,
					student
				}
			}
		},
		onLoad(opt) {
			if(this.role === 0) {
				this.studentId = opt.studentId;
				this.studentName = opt.student
			} else if(this.role === 1) {
				this.classId = opt.classId;
				this.className = opt.class;
			}
			console.log(opt);
			
		},
		methods: {
			handleChangeTerm(e) {
				this.termIndex = e.detail.value;
				this.termId = this.terms[e.detail.value].id
				this.termId
			}
		}
	}
</script>

<style lang="less" scoped>
.h-grade-container {
	flex-direction: column;
	padding: 18rpx;
	box-sizing: border-box;
	.h-grade-title {
		line-height: 1.5;
		text-align: center;
		font-size: 40rpx;
		color: #101010;
	}
	.h-grade-select {
		margin: 28rpx 0 58rpx;
		width: 400rpx;
		height: 60rpx;
		border: 2rpx solid #eee;
		border-radius: 6rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 28rpx;
		color: #101010;
	}
	.h-grade-table {
		font-size: 28rpx;
		color: #5b6b73;
		border: 1rpx solid #eee;
		overflow-x: scroll;
		.h-grade-row {
			border-bottom: 1rpx solid #eee;
			.h-grade-col {
				width: 20%;
				padding: 16rpx;
				text-align: center;
				box-sizing: border-box;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
}
</style>
