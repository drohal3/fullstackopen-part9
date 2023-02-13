import {Entry as EntryType} from "../../types";

import Entry from "./Entry";
import React from "react";

interface EntriesProps {
    entries: EntryType[];
}
const Entries:React.FC<{entries:EntryType[]}> = ({entries}:EntriesProps) => {
    const entryCompStyle = {
        border: '2px solid black',
        padding: '1.5em',
        margin: '5px'
    };

    return (
      <div>
          {entries.map((entry, i) => {
              console.log('entry',entry);
              return (<div key={i} style={entryCompStyle}><Entry entry={entry} /></div>);
          })}
      </div>
    );
};

export default Entries;