/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("tariffs", (table) => {
        table.increments("id").primary();
        table.string("warehouse").notNullable();
        table.decimal("deliverydumpkgtofficebase").notNullable();
        table.decimal("deliverydumpkgtofficeliter").notNullable();
        table.decimal("deliverydumpkgtreturnexpr").notNullable();
        table.decimal("deliverydumpsrgofficeexpr").notNullable();
        table.decimal("deliverydumpsrgreturnexpr").notNullable();
        table.decimal("deliverydumpsupcourierbase").notNullable();
        table.decimal("deliverydumpsupcourierliter").notNullable();
        table.decimal("deliverydumpsupofficebase").notNullable();
        table.decimal("deliverydumpsupofficeliter").notNullable();
        table.decimal("deliverydumpsupreturnexpr").notNullable();
        table.date("date").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("tariffs");
};




