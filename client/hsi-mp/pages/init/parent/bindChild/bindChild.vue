<template>
	<view class="h-bc-container h-flex-center">
		<view class="h-bc-title">请完成孩子信息：</view>
		<view v-for="(item, index) in childs" :key="index" class="h-bc-input">
			<view class="h-bc-search"><input @blur="handleCompleteInput(index, $event)" :placeholder="'输入孩子' + (index + 1) + '学号'" type="text" /></view>
		</view>
		<view class="h-bc-btn h-flex-center"><h-btn @tap="handleBind">绑定</h-btn></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag: 0,
			childs: [{ id: '', name: '' }, { id: '', name: '' }, { id: '', name: '' }],
			childIds: ['', '', ''],
			childIdName: []
		};
	},
	onLoad(params) {
		let count = parseInt(params.childCount);
		console.log(count);
		this.childs = this.childs.slice(0, count);
		this.childIds = this.childIds.slice(0, count);
		this.$forceUpdate()
		console.log(this.childs);
	},
	methods: {
		handleBind() {
			console.log('绑定');
			console.log(this.childIds);
			let rows = this.childIds.map(r => {
				return {
					studentId: r,
					parentId: uni.getStorageSync('ID')
				}
			})
			if (!this.flag) {
				this.flag ++
				uni.request({
					url: 'http://127.0.0.1:8888/familyNew',
					method: 'POST',
					data: {
						rows
					},
					success() {
						uni.showToast({
							title: '绑定成功',
							duration: 1000
						})
						uni.showToast({
							title: '请等待审核',
							duration: 2000,
							success() {
								uni.navigateTo({
									url: '/pages/init/init'
								})
							}
						})
					},
					fail(err) {
						console.log(err);
						uni.showToast({
							title: '绑定失败'
						})
						that.flag = 0
					}
				})
			}
		},
		handleCompleteInput(index, value) {
			console.log(index, value.target.value);
			this.childIds[index] = value.target.value
		}
	}
};
</script>

<style lang="less">
// 主色调
@primary-color: #00873a;
@orange: #fcb421;
// 间隔
@space: 36 * 2rpx;
// 字体大小
@font-size: 14 * 2rpx;
// 字体颜色
@primary-base: rgba(0, 0, 0, 0.65);
@primary-dark: #000;
.h-bc-container {
	flex-direction: column;
	.h-bc-title {
		font-size: 28 * 2rpx;
		color: @primary-base;
		text-align: center;
	}
	.h-bc-input {
		margin-top: @space;
		.h-bc-search {
			width: 260 * 2rpx;
			height: 52 * 2rpx;
			margin: 3 * 2rpx 0;
			input {
				width: 256 * 2rpx;
				height: 48 * 2rpx;
				padding: 0 @space 0 16 * 2rpx;
				border: 4rpx solid @primary-dark;
				border-radius: 48rpx;
				font-size: @font-size;
				color: @primary-base;
				box-sizing: border-box;
			}
		}
	}
	.h-bc-btn {
		margin-top: @space;
	}
}
</style>
