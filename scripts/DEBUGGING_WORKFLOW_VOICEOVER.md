# Voiceover Script - A Systematic Debugging Workflow

## Hook

Debugging is not guessing.

A reliable workflow helps you move from a vague symptom to a verified fix.

## Step 1 - Reproduce

Confirm the problem happens consistently.

Write down the input, the expected result and the actual result.

## Step 2 - Isolate

Reduce the problem to the smallest piece of code that still fails.

## Step 3 - Inspect

Read the final line of the traceback first.

Print or examine the values immediately before the failure.

## Step 4 - Form one hypothesis

Change one thing at a time.

Several simultaneous changes make it difficult to know what solved the issue.

## Step 5 - Verify

Run the original failing case and at least one edge case.

Then add an automated test so the defect does not quietly return.

## Mission

Fix an accumulating total and a mutable-default argument, then explain why each bug occurred.
