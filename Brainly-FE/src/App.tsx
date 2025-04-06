import { Button } from './components';
import { PlusIcon, ShareIcon } from './assets/icons';

function App() {
  return (
    <div>
      <Button
        variant='primary'
        text='Share'
        size="sm"
        endIcon={<ShareIcon />}
        onClick={() => {
          console.log("I clicked the button")
        }}
      />
      <Button
        startIcon={<PlusIcon />}
        variant='secondary'
        text='Add Content'
        size="md"
        onClick={() => {
          console.log("I clicked the button")
        }}
      />

      <Button
        startIcon={<PlusIcon />}
        variant='secondary'
        text='Add Content'
        size="lg"
        onClick={() => {
          console.log("I clicked the button")
        }}
      />
    </div>
  )
}

export default App
