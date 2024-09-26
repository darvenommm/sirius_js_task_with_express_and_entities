import { Sequelize, Model, DataTypes } from "sequelize";
import { config } from "dotenv";
config();

const DB_NAME = process.env.DATABASE_NAME;
const USERNAME = process.env.DATABASE_USERNAME;
const PASSWORD = process.env.DATABASE_PASSWORD;

export const db = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) ?? 5432,
});

export class Owner extends Model {}
Owner.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Owner",
  }
);

export class Cat extends Model {}
Cat.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Cat",
  }
);

Owner.hasMany(Cat, {
  foreignKey: "ownerId",
  as: "cats",
});

Cat.belongsTo(Owner, {
  foreignKey: "ownerId",
  as: "owner",
});

async function syncModels() {
  try {
    await db.sync({ force: true });
    console.log("Models synchronized successfully!");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
}

syncModels();
