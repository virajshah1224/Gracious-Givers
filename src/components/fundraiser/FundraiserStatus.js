// Author: Akanksha Singh (B00892887)

import * as FundraiserConstants from './FundraiserConstants';

export default function FundraiserStatus(props) {
    const status = props.statusValue;
    const allStatus = FundraiserConstants.fundraiserStatus;
    
    const draft = {color:'#6f6868'}
    const active = {color:'green'}
    const deactivated = {color:'red'}
    const completed = {color:'green'}
    const pendingApproval = {color:'orange'}

    return (
        
        <div id="fundraiser-status" 
            style={{fontWeight:'600', fontSize:'1.1rem', fontStyle: 'italic'}}>
            {
                status === allStatus.active && 
                <span style={active}>{allStatus.active}</span> 
            }
            {
                status === allStatus.draft && 
                <span style={draft}>{allStatus.draft}</span> 
            }
            {
                status === allStatus.deactivated && 
                <span style={deactivated}>{allStatus.deactivated}</span>
            }
            {
                status === allStatus.completed && 
                <span style={completed}>{allStatus.completed}</span>
            }
            {
                status === allStatus.pendingApproval && 
                <span style={pendingApproval}>{allStatus.pendingApproval}</span>
            }
        </div>
    );

}