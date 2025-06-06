import React, { FC } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import { Layout as ALayout, Menu } from 'antd'
import { ProductOutlined, ShoppingCartOutlined, ProfileOutlined } from '@ant-design/icons'
import { MenuItemType } from "antd/es/menu/interface"
import LanguageToggle from "src/shared/lang-toggle/lang-toggle"
import ThemeToggle from "src/shared/theme-toggle/theme-toggle"
import "./layout.css"
import logo from "./logo.svg"
import { title } from "process"
import RefIcon from "@ant-design/icons/lib/icons/AccountBookFilled"

interface RouteMenuItem extends MenuItemType {
    path: string
}

const CreateRouteMenuItem = (id: number, title: string, path: string, icon: typeof RefIcon): RouteMenuItem => {
    return {
        key: id,
        icon: React.createElement(ProductOutlined),
        label: title,
        extra: React.createElement(NavLink, { to: path }),
        path
    }
}

const items: RouteMenuItem[] = [
    CreateRouteMenuItem(1, 'Каталог', "/prod", ProductOutlined),
    CreateRouteMenuItem(2, 'Корзина', "/basket", ShoppingCartOutlined),
    CreateRouteMenuItem(3, 'Профиль', "/profile", ProfileOutlined),
    ]

const handleDefaultSelectedKeys = (): string[] => {
    return items.length > 0 ? [items[0].key.toString()] : []
}

const handleSelectedKeys = (path: string): string[] => {
    const selected = items.filter(x => x.path === path).map(x => x.key.toString())
    return selected
}

const Layout: FC = () => {
    const location = useLocation();

    return (
        <ALayout>
            <ALayout.Header className="layout-header">
                <div className="header-link">
                    <img src={logo} className="app-logo" alt="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={handleDefaultSelectedKeys()}
                        selectedKeys={handleSelectedKeys(location.pathname)}
                        items={items}
                        />
                </div>
                <div className="header-tools">
                    <ThemeToggle />
                    <LanguageToggle />
                </div>
            </ALayout.Header>
            <ALayout.Content className="layout-content">
                <Outlet />
            </ALayout.Content>
        </ALayout>
    )
}

export default Layout