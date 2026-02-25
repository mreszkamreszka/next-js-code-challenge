# Component import flow

## Example for a button component:

1. In the terminal `npx shadcn@latest add button`.

2. The newly added component gets placed inside `/src/ui/shadcn-components/`. From there you can move them somewhere else if needed.

3. Make sure to use this import of cn: `import cn from '@/ui/utils/cn';`. (This needs to be set to default in components.json)

4. Remove the default tailwind classes from the component and add your own classes using CSS modules.

5. Change the interface to `type ButtonProps`. To change interface to type for your ButtonProps, you can simply replace the interface keyword with type, and use an intersection (&) to combine types. otherwise this will result in a eslint error/warning.

6. With the use of `React.ButtonHTMLAttributes<HTMLButtonElement>` you already have all of the default properties of a button.

7. Add additional styling variations within the `const inputVariants = cva($.input, {}` utility.

```
const buttonVariants = cva($.button, {
    variants: {
        variant: {
            primary: $.primary,
            secondary: $.secondary,
            outline: $.outline,
            ghost: $.ghost,
        },
        size: {
            sm: $.sm,
            md: $.md,
            lg: $.lg,
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
});
```

8. Rename the component to camel case, button -> Button.

9. Export the component like this `export default Button;`

## eslint errors:

- `Prop spreading is forbidden eslint react/jsx-props-no-spreading` where components use {...props}
- `Prefer default export on a file with single export. eslint import/prefer-default-export` when exporting components (input for example)
- `exported declaration 'Input' not used within other modules eslint import/no-unused-modules` when exporting component (input for example)
