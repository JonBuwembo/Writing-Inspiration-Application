import React from 'react';

const OverviewPage = () => {
    return (
        <div>
            <h2>Overview of Your Content</h2>

            <p>
                <strong>Projects Summary:</strong> 5 active projects, two overdue.
            </p>

            <p>
                <strong>Upcoming Deadlines:</strong> (links to projects).
            </p>

            <p>
                <strong>Jump to Recent:</strong> Most recent project is "Project A" last edited 2 hrs ago.
            </p>

            <p style={{ marginLeft: '2em' }}>
                <strong>Most Recent Three Chapters within Recent Project:</strong>
                <span style={{ marginLeft: '2em', display: 'block' }}>Chapter 1 has 3 notes</span>
                <span style={{ marginLeft: '2em', display: 'block' }}>Chapter 2 has 5 notes</span>
                <span style={{ marginLeft: '2em', display: 'block' }}>Chapter 3 has 12 notes</span>
            </p>

            <p>
                <strong>Drafts:</strong> Draft saved 3 days ago -/ Continue?
            </p>

            <p>
                <strong>Chat Activity:</strong>
                <span style={{ marginLeft: '2em', display: 'block' }}>2 pending invites (link to chats).</span>
                <span style={{ marginLeft: '2em', display: 'block' }}>2 notifications from chats.</span>
            </p>
        </div>
    )
}

export default OverviewPage;