/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/views/layout/Layout";

const AccountRouter = {
  path: "/Account",
  component: Layout,
  redirect: "noredirect",
  name: "Account",
  meta: {
    title: "账户管理",
    icon: "zhanghu"
  },
  children: [
    {
      path: "firm",
      component: () => import("@/views/pages/Account/firm"),
      name: "firm",
      meta: { title: "企业信息", icon: "qiye" }
    },
    {
      path: "user",
      component: () => import("@/views/pages/Account/user"),
      name: "user",
      meta: { title: "账户信息", icon: "user" }
    },
    {
      path: "password",
      component: () => import("@/views/pages/Account/password"),
      name: "password",
      meta: { title: "修改密码", icon: "password" }
    }
  ]
};
export default AccountRouter;
