import Link from 'next/link';

import Hero from '@/assets/svg/StartScreenImage.svg';
import './page.scss';
import { Button, Typography } from '@/components';

export default function Home() {
  return (
    <div className="c-home c-home_background">
      <div className={'c-home_content'}>
        <Hero className={'c-home_image'} />
        <div className={'c-home_wrapper'}>
          <Typography
            tag="h1"
            classNames={['c-home_text', 't-title', '-f32md', '-f56']}
          >
            Who wants to be a millionaire?
          </Typography>
          <Link href="/game">
            <Button classNames="t-text -f20 -f14md">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
