# Voiceover Script — SQL JOINs

## Hook

A customer table tells us who the customer is. An orders table tells us what they bought.

To answer useful questions, we often need both.

## Shared keys

Both tables contain customer ID.

That shared key lets SQL match related rows.

## Inner join

An inner join keeps only customers that have matching orders.

```sql
SELECT c.name, o.amount
FROM customers c
INNER JOIN orders o
ON c.customer_id = o.customer_id
```

## Left join

A left join keeps every customer from the first table, even when no order exists.

This is useful when we want to identify inactive customers.

## Common mistake

Join on stable IDs rather than names whenever possible.

Names can be duplicated or changed. IDs are designed to represent one entity consistently.

## Mission

Create an inner join first.

Then create a left join and identify the customer who has no order.
