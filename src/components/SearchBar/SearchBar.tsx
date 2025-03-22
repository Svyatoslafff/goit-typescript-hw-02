import { Formik, Form, Field } from 'formik';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-hot-toast';
import * as types from './SearchBar.types';
import { OnSearchValues } from '../App/App.types';

import React from 'react';

import css from './SearchBar.module.scss';

export default function SearchBar({ onSearch, perPage }: types.SearchBarProps) {
    const initialValues = {
        query: '',
        perPage: perPage,
    };

    function handleSubmit(value: OnSearchValues, action) {
        if (value.query === '') {
            toast.error('Please write something to search!');
            return;
        }

        onSearch(value);
        action.resetForm();
    }
    return (
        <header className={css.header}>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize
            >
                <Form className={css.formContainer}>
                    <Field
                        className={css.perPageInput}
                        type="number"
                        name="perPage"
                        min="1"
                        max="30"
                    />
                    <div className={css.searchBar}>
                        <Field
                            name="query"
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images"
                            className={css.requestInput}
                        />
                        <button type="submit">
                            ''
                            <GrSearch color="black" />
                        </button>
                    </div>
                </Form>
            </Formik>
        </header>
    );
}
