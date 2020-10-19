@extends('layouts.app')

@section('content')
<h1>{{ $script->title }} (#{{ $script->id }})</h1>
<p>
{{$script->description}}
</p>

<pre>{{$script->code}}</pre>
@endsection