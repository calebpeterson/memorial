![](docs/memorial-banner.png)

Ever wanted to keep track of how something has changed while you're working on it locally?

## Usage

`<some command that outputs files/lines/etc...> | memorial --lines --print`

Gives you the original command followed by:

```
original command output
...

Latest measurement: 26 lines

      26.00 ┼   ╭
      22.75 ┼──╮│
      19.50 ┤  ││
      16.25 ┤  ││
      13.00 ┤  ╰╯
       9.75 ┤
       6.50 ┤
       3.25 ┤
       0.00 ┤
```

Do more work, run the command again, piped into `memorial --lines --print` and see the trend:

```
original command output
...

Latest measurement: 24 lines

      26.00 ┼   ╭╮
      22.75 ┼──╮│╰─╮
      19.50 ┤  ││  │╭╮
      16.25 ┤  ││  ╰╯│
      13.00 ┤  ╰╯    ╰─
       9.75 ┤
       6.50 ┤
       3.25 ┤
       0.00 ┤
```

### Print

Show the current trend line at any time:

```
> memorial --print
```

Can be coupled with `--lines` to count the number of lines read on STDIN and then show the trendline when the input stream terminates.

### Table

Show the raw measurements at any time:

```
> memorial --table
```

Can be coupled with `--lines` to count the number of lines read on STDIN and then show the raw measurements when the input stream terminates.

### Purge

Purge all measurements and start with a blank slate:

```
> memorial --purge
```

## Measurement schemes

`memorial` can gather the measurement to track by:

### Counting lines (`--lines`)

The `--lines` mode will simply count the number of lines of input passed to `memorial` on STDIN and consider the total for a given invocation to be the measurement to store.

**When to use:**

- using `grep` (or similar) to find all occurrences of the metric to measure
