import React, { Component } from 'react'

import XMLViewer from 'react-xml-viewer'

const xml = '<?xml version="1.0"?><example description="XML Example"><hello>World</hello><!-- <comment>example</comment> --><cdata><![CDATA[<foo></bar>]]></cdata><?go example?></example>'

export default class App extends Component {

  
  render () {
    function onPick(path) {
      console.log("path", path)
    }

    return (
      <div>
        <XMLViewer onPick={onPick} collapsible={true} xml={xml} theme={{elementPadding: '100px'}}/>
      </div>
    )
  }
}
