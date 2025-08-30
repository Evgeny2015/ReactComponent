export type Product = {
    id: string;             // идентификатор товара
    category: Category;     // категория
    commandId: string;
    createdAt: Date;
    desc?: string;          // описание
    image: string;          // изображение
    name: string;           // название
    oldPrice?: number;
    photo?: string;
    price: number;          // стоимость
    updatedAt: Date;
}