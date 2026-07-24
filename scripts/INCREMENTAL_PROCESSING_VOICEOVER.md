# Voiceover Script - Incremental Data Processing

## Hook

Imagine receiving one million new transactions each day.

Reprocessing every transaction from the beginning may be wasteful.

Incremental processing handles only records that are new or changed.

## Checkpoints

A checkpoint records how far the pipeline has progressed.

It could be:

- the highest processed ID
- the latest timestamp
- a file name
- a database version

## Filtering new records

```python
new_records = [
    record
    for record in records
    if record["id"] > last_processed_id
]
```

## Advancing safely

Update the checkpoint only after the new records have been processed successfully.

Otherwise a failed batch may be skipped during the next run.

## Mission

Filter records after a stored checkpoint, process them, and calculate the next checkpoint.
