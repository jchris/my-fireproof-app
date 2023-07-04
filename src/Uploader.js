import React, { useEffect } from 'react'
import { KeyringProvider, useKeyring } from '@w3ui/react-keyring'
import { UploaderProvider, useUploader } from '@w3ui/react-uploader'

import { withIdentity } from './Authenticator'

function MyUploaderArea({ database }) {
  const [, { uploadFile }] = useUploader()

  const testUpload = async () => {
    // make a test blob
    const blob = new Blob(['hello world'], { type: 'text/plain' })
    const did = await uploadFile(blob)
    console.log('did upload', did, did.toString())
  }

  useEffect(() => {
    console.log('setting uploader', database.name)
    database.blocks.valet.secondary.config.upload = async bytes => {
      console.log('uploading', bytes.length)
      const did = await uploadFile(new Blob([bytes]))
      console.log('did upload', did.toString())
      return did
    }
  }, [database])

  return <div onClick={testUpload}>MyUploaderArea</div>
}

const UploaderArea = withIdentity(MyUploaderArea)

function AgentLoader({ children }) {
  const [, { loadAgent }] = useKeyring()
  // eslint-disable-next-line
  useEffect(() => {
    loadAgent()
  }, [loadAgent]) // load agent - once.
  return children
}

function Uploader({ database }) {
  return (
    <KeyringProvider>
      <UploaderProvider>
        <AgentLoader>
          <UploaderArea database={database} />
        </AgentLoader>
      </UploaderProvider>
    </KeyringProvider>
  )
}

export { Uploader }
