# Voiceover Script - Handling API Responses

## Hook

An API does not always return the data you expect.

The request may succeed, fail, or return a valid response with optional fields missing.

## Status codes

A status code of 200 normally means the request succeeded.

Check the status before using the payload.

```python
if status_code == 200:
    print("Success")
```

## Missing fields

Direct square-bracket access raises a KeyError when the field is absent.

```python
payload["results"]
```

For optional fields, use a safe default.

```python
results = payload.get("results", 0)
```

## Error payloads

Successful and failed responses may have different structures.

Do not assume every payload contains the same keys.

## Mission

Check a simulated API status, safely read an optional result count, and fix code
that assumes an error message is always present.
