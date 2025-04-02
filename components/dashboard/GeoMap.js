import React from 'react';

export default function GeoMap({ data }) {
  if (!data) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Geographical Distribution</h3>
        <div className="h-96 bg-gray-100 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Loading map data...</p>
        </div>
      </div>
    );
  }

  // For now, we'll create a simple placeholder for the map
  // This will be replaced with a proper map visualization using Leaflet or similar
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Geographical Distribution</h3>
      <div className="h-96 relative bg-gray-100 overflow-hidden">
        {/* US Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="relative">
              {/* Simple US map outline */}
              <svg viewBox="0 0 959 593" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M832 512L831 509L829 507L828 505L825 503L822 500L819 499L816 499L814 498L811 496L809 495L807 493L805 491L803 489L802 486L800 484L798 482L796 480L794 478L792 476L790 474L788 472L786 470L784 468L782 466L780 464L778 462L776 460L774 458L772 456L770 454L768 452L766 450L764 448L762 446L760 444L758 442L756 440L754 438L752 436L750 434L748 432L746 430L744 428L742 426L740 424L738 422L736 420L734 418L732 416L730 414L728 412L726 410L724 408L722 406L720 404L718 402L716 400L714 398L712 396L710 394L708 392L706 390L704 388L702 386L700 384L698 382L696 380L694 378L692 376L690 374L688 372L686 370L684 368L682 366L680 364L678 362L676 360L674 358L672 356L670 354L668 352L666 350L664 348L662 346L660 344L658 342L656 340L654 338L652 336L650 334L648 332L646 330L644 328L642 326L640 324L638 322L636 320L634 318L632 316L630 314L628 312L626 310L624 308L622 306L620 304L618 302L616 300L614 298L612 296L610 294L608 292L606 290L604 288L602 286L600 284L598 282L596 280L594 278L592 276L590 274L588 272L586 270L584 268L582 266L580 264L578 262L576 260L574 258L572 256L570 254L568 252L566 250L564 248L562 246L560 244L558 242L556 240L554 238L552 236L550 234L548 232L546 230L544 228L542 226L540 224L538 222L536 220L534 218L532 216L530 214L528 212L526 210L524 208L522 206L520 204L518 202L516 200L514 198L512 196L510 194L508 192L506 190L504 188L502 186L500 184L498 182L496 180L494 178L492 176L490 174L488 172L486 170L484 168L482 166L480 164L478 162L476 160L474 158L472 156L470 154L468 152L466 150L464 148L462 146L460 144L458 142L456 140L454 138L452 136L450 134L448 132L446 130L444 128L442 126L440 124L438 122L436 120L434 118L432 116L430 114L428 112L426 110L424 108L422 106L420 104L418 102L416 100L414 98L412 96L410 94L408 92L406 90L404 88L402 86L400 84L398 82L396 80L394 78L392 76L390 74L388 72L386 70L384 68L382 66L380 64L378 62L376 60L374 58L372 56L370 54L368 52L366 50L364 48L362 46L360 44L358 42L356 40L354 38L352 36L350 34L348 32L346 30L344 28L342 26L340 24L338 22L336 20L334 18L332 16L330 14L328 12L326 10L324 8L322 6L320 4L318 2L316 0" stroke="#1a365d" strokeWidth="2"/>
              </svg>
              
              {/* Top States Overlay */}
              <div className="absolute top-4 right-4 bg-white p-4 rounded-md shadow-md">
                <h4 className="text-sm font-semibold mb-2">Top States</h4>
                <ul className="text-xs space-y-1">
                  {data?.states?.slice(0, 5).map((state, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{state.code}</span>
                      <span className="font-medium">{state.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
