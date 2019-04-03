/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/views/layout/Layout";

const NewsRouter = {
  path: "/News",
  component: Layout,
  redirect: "/News/newsList",
  name: "News",
  meta: {
    title: "新闻管理",
    icon: "news"
  },
  children: [
    {
      path: "newsAdd",
      component: () => import("@/views/pages/News/add"),
      name: "newsAdd",
      meta: { title: "添加新闻", icon: "jia" }
    },
    {
      path: "newsEdit",
      component: () => import("@/views/pages/News/edit"),
      name: "newsEdit",
      hidden: true,
      meta: { title: "编辑新闻", icon: "table" }
    },
    {
      path: "newsShow",
      component: () => import("@/views/pages/News/show"),
      name: "newsShow",
      hidden: true,
      meta: { title: "新闻展示", icon: "table" }
    },
    {
      path: "newsList",
      component: () => import("@/views/pages/News/list"),
      name: "newsList",
      meta: { title: "新闻列表", icon: "list" }
    },
    {
      path: "newsDel",
      component: () => import("@/views/pages/News/del"),
      name: "newsDel",
      meta: { title: "回收站", icon: "del" }
    }
  ]
};
export default NewsRouter;
