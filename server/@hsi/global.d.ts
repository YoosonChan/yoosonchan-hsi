import { Model } from "sequelize"

declare global {
    interface DB {
        [key: string]: any
        [index: number]: any
    }
    interface Conf {
        [key: string]: any
        [index: number]: any
    }
}