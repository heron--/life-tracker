import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ isAuthed, ...props }) {
    return (
        isAuthed
            ? <Route {...props} />
            : <Redirect to="/" />
    )
}
