<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">
.h-flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.h-flex-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
