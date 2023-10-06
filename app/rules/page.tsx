export default function RulesPage() {
  return (
    <div className="text-center mt-11 mb-8">
      <h1 className="font-sans text-3xl text-center">Rules</h1>
      <ol className="space-y-4 mt-8">
        <li>
          Spilling (of any sort) on yourself.
          <br /> <strong>+1</strong>
        </li>
        <li>
          Spilling a drink on someone else.
          <br /> <strong>+2</strong>
        </li>
        <li>
          Failure to finish drink. <br /> <strong>+2</strong>
        </li>
        <li>
          Wetting a green (going to the toilet) on a water hazard. (Freight &
          Renard) <br /> <strong>+2</strong>
        </li>
        <li>
          Dropping a glass. <br /> <strong>+3</strong>
        </li>
        <li>
          Refusal of service. <br /> <strong>+5</strong>
        </li>
        <li>
          Refusal of entry. <br /> <strong>+10</strong>
        </li>
      </ol>
      <hr className="w-10 mt-8 bg-black h-[2px] mx-auto" />
      <ol className="space-y-4 mt-8">
        <li>
          Kissing Ryan on the forehead.
          <br /> <strong>-1</strong>
        </li>
        <li>
          Kissing Ryan on the cheek.
          <br /> <strong>-3</strong>
        </li>
        <li>
          Kissing Ryan on the lips.
          <br /> <strong>-5</strong>
        </li>
      </ol>
    </div>
  );
}
