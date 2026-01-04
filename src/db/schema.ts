import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  decimal,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const products = pgTable("products", { // a product available for purchase
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1024 }).notNull(),
  price: decimal("price").notNull(),
  stock: integer("stock").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
}); 

export const orders = pgTable("orders", { // an order represents a user's purchase
  id: serial("id").primaryKey(),
  total_price: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", { //an order item represents a product in an order
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id), 
  price_at_purchase: numeric("price_at_purchase", {
    precision: 10, // how many total digits total
    scale: 2, // how many digits after the decimal point 
  }).notNull(),
  quantity: integer("quantity").notNull(),
});

export const productRelations = relations(products, ({ many }) => ({ // a product can be in many order items or in other words, many orders can contain the same product
  orderItems: many(orderItems),
}));

export const orderRelations = relations(orders, ({ many }) => ({ // an order can have many order items
  orderItems: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({ //an order item belongs to one product and one order
  product: one(products, {
    fields: [orderItems.product_id],
    references: [products.id],
  }),
  order: one(orders, { // each order item belongs to one order
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
}));
