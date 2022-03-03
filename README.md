# FinanceApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


# Project TODO's

1) After it has been submitted form input areas need to be cleared.

2) Categories interface has both these which is not correct.
Spring may be displaying them wrong.
transactionSubcategories: Subcategory[];
subcategories: Subcategory[];

http://localhost:8080/api/transactionSubcategories/

    transactionSubcategories


http://localhost:8080/api/transactionCategories

    subcategories

3) REDO service classes to contain their respective classes in there own classes.
    EX
    export interface StockInterface {
        symbol: string;
        lastTradePriceOnly: number;
        change: number;
        changeInPercent: number;
    }

4) Ensure only unique names can be added to categories and subcategories.

5) Fix bug on the categories component -> last element throw an error when you try delete.



Just checking


-- Just checking checking
    -- checking checking

    