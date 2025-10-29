export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","freemap-dark.json","freemap.json","robots.txt"]),
	mimeTypes: {".json":"application/json",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BSUnQRmO.js",app:"_app/immutable/entry/app.B5J8mcaO.js",imports:["_app/immutable/entry/start.BSUnQRmO.js","_app/immutable/chunks/67qOq2eY.js","_app/immutable/chunks/DHB6DlLB.js","_app/immutable/chunks/CU_KDlvJ.js","_app/immutable/chunks/RGkzFezX.js","_app/immutable/entry/app.B5J8mcaO.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/CU_KDlvJ.js","_app/immutable/chunks/RGkzFezX.js","_app/immutable/chunks/DhCF9jbZ.js","_app/immutable/chunks/DHB6DlLB.js","_app/immutable/chunks/3IU1t4Q3.js","_app/immutable/chunks/BZasKMTr.js","_app/immutable/chunks/kkc0rSdA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
		],
		remotes: {
			'17m8e5g': __memo(() => import('./chunks/remote-17m8e5g.js')),
			'134xwjn': __memo(() => import('./chunks/remote-134xwjn.js')),
			'11qft9n': __memo(() => import('./chunks/remote-11qft9n.js')),
			'y6e42g': __memo(() => import('./chunks/remote-y6e42g.js')),
			'92b49x': __memo(() => import('./chunks/remote-92b49x.js')),
			'ug0imp': __memo(() => import('./chunks/remote-ug0imp.js')),
			'1knng9o': __memo(() => import('./chunks/remote-1knng9o.js'))
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/alex",
				pattern: /^\/alex\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/sources/stream",
				pattern: /^\/api\/sources\/stream\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/sources/stream/_server.ts.js'))
			},
			{
				id: "/cities",
				pattern: /^\/cities\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/country/[country]",
				pattern: /^\/country\/([^/]+?)\/?$/,
				params: [{"name":"country","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/owners",
				pattern: /^\/owners\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/rankings",
				pattern: /^\/rankings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/sectors",
				pattern: /^\/sectors\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/sector/[sector]",
				pattern: /^\/sector\/([^/]+?)\/?$/,
				params: [{"name":"sector","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/sources",
				pattern: /^\/sources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/source/[id]",
				pattern: /^\/source\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
