export default function RulesPage() {
  return (
    <div className="text-center mt-11">
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
          Wetting on the green on a water hazard. <br /> <strong>+2</strong>
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
    </div>
  );
}
