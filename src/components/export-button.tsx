import { IconUserPlus } from '@tabler/icons-react'
import { Button } from './ui/button'

const ExportButton = () => {
  const ExportHandler = () => {
    // console.log("Exporting")
  }
  return (
    <div>
       <Button className='space-x-1' onClick={() =>ExportHandler()}>
              <span>Add User</span> <IconUserPlus size={18} />
            </Button>
    </div>
  )
}

export default ExportButton
