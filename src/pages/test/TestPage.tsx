import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useRouteMatch } from "react-router";
import { RouteComponentProps } from 'react-router-dom';



function TestPage() {
    const { name } : any = useParams();

  // Do whatever you want with the match...
    return ( <div>User {name} </div>
    );
}

export default TestPage;