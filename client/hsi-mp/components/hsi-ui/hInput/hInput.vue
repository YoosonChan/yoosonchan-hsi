<!-- 
	简单输入框组件 @by yoosonchan
	【params】
		value -------- 输入框的值 
		label -------- 输入框标签
		placeholder -- 输入框提示
	【event】
		@blur ------- 失去焦点后的事件
		@input ------ 输入时的值变化
 -->
<template>
	<view class="h-input">
		<view v-if="label" class="h-input-label">{{label}}:</view>
		<view>
			<input @blur="handleCompleteInput" @input="handleChange" :value="value" type="text" :placeholder="placeholder" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	props: {
		label: String,
		value: String,
		placeholder: String
	},
	methods: {
		handleCompleteInput(value) {
			this.$emit('blur', value.target.value)
		},
		handleChange (value) {
			this.$emit('change', value.detail.value)
		}
	}
}
</script>

<style lang="less" scoped>
@label-color: rgba(0, 0, 0, .48);
@label-space: 8 * 2rpx;
@input-border: rgba(0, 0, 0, .48);
@input-color: rgba(0, 0, 0, .65);
@input-space: 36 * 2rpx;
@font-size: 18* 2rpx;
	
.h-input {
	.h-input-label {
		margin: 0 0 @label-space 2 * @label-space;
		font-size: @font-size;
		color: @label-color
	}
	input {
		width: 256 * 2rpx;
		height: 48 * 2rpx;
		padding: 0 @input-space 0 16 * 2rpx;
		border: 4rpx solid @input-border;
		border-radius: 48rpx;
		font-size: @font-size;
		color: @input-color;
		box-sizing: border-box;
	}
}
</style>
