import { Button, Card } from './components';
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
      <Card
        title='Twitter'
        link='https://twitter.com/elonmusk/status/1686040632306819073'
        type='twitter'
      />
      <Card
        title='Youtube'
        link='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        type='youtube'
      />
      <Card
        title='Facebook'
        link='https://www.facebook.com/NASA/posts/10161935695201772'
        type='facebook'
      />
      <Card
        title='Instagram'
        link='https://www.instagram.com/p/CuNvGksOEcP/'
        type='instagram'
      />
      <Card
        title='LinkedIn'
        link='urn:li:share:7083144825218863105'
        type='linkedin'
      />
    </div>
  )
}

export default App
