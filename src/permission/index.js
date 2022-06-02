import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
	store.commit('user/getToken')
	const token = store.state.user.token
	if (!token && to.meta.requireLogin !== false) {
		next({path: '/login'})
	} else if (token && to.meta.requireLogin === false) {
		next({path: '/'})
	} else {
		next()
	}
})
