import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/* Router Modules */
import NewsRouter from "./modules/News";
import AccountRouter from "./modules/Account";
export const constantRouterMap = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/pub/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/pub/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/pub/login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/pub/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/pub/errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/pub/index/index"),
        name: "Dashboard",
        meta: {
          title: "首页",
          icon: "dashboard",
          noCache: false,
          affix: true
        }
      }
    ]
  },
  {
    path: "/Product",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "productList",
        component: () => import("@/views/pages/Product/list"),
        name: "productList",
        meta: {
          title: "我的产品",
          icon: "product"
        }
      }
    ]
  },
  {
    path: "/Group",
    component: Layout,
    redirect: "dashboard",
    hidden: true,
    children: [
      {
        path: "groupList/:id",
        component: () => import("@/views/pages/Group/list"),
        name: "groupList",
        meta: {
          title: "团期列表",
          icon: "product"
        }
      }
    ]
  },
  {
    path: "/Price",
    component: Layout,
    redirect: "dashboard",
    hidden: true,
    children: [
      {
        path: "priceList",
        component: () => import("@/views/pages/Price/list"),
        name: "priceList",
        meta: {
          title: "价格列表",
          icon: "product"
        }
      }
    ]
  },
  {
    path: "/Storeroom",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "storeroomList",
        component: () => import("@/views/pages/Storeroom/list"),
        name: "storeroomList",
        meta: {
          title: "我的库房",
          icon: "form"
        }
      }
    ]
  },
  {
    path: "/Distributor",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "distributorList",
        component: () => import("@/views/pages/Distributor/list"),
        name: "distributorList",
        meta: {
          title: "我的分销员",
          icon: "fenxiao"
        }
      }
    ]
  },
  {
    path: "/Order",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "orderList",
        component: () => import("@/views/pages/Order/list"),
        name: "orderList",
        meta: {
          title: "客户订单",
          icon: "clipboard"
        }
      }
    ]
  },
  {
    path: "/Analysis",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "AnalysisList",
        component: () => import("@/views/pages/Analysis/list"),
        name: "AnalysisList",
        meta: {
          title: "数据分析",
          icon: "fenxi"
        }
      }
    ]
  },
  NewsRouter,
  AccountRouter
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [];
